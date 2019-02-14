const CronJob = require('cron').CronJob
const request = require('request');
const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer");

app = express();

// Obtém a data/hora atual
const data = new Date();
// console.log(new Date());

// Guarda cada sessão de data/ hora em uma variável
const dia     = (data.getDate() < 10 ? '0' : '') + data.getDate();    // 1-31, aqui com formatação para dois dígitos
const dia_sem = data.getDay();            // 0-6 (zero=domingo)
const mes     = ((data.getMonth() + 1) < 10 ? '0' : '') + (data.getMonth() + 1); // 0-11 (zero=janeiro), aqui com formatação para dois dígitos
const ano2    = data.getYear();           // 2 dígitos
const ano4    = data.getFullYear();       // 4 dígitos
const hora    = data.getHours();          // 0-23
const min     = data.getMinutes();        // 0-59
const seg     = data.getSeconds();        // 0-59
//const mseg    = data.getMilliseconds();   // 0-999
//const tz      = data.getTimezoneOffset(); // em minutos 

// Formata a data e a hora
const hoje = dia + '-' + mes + '-' + (ano2-100);
const horas = hora + ':' + min + ':' + seg;
//console.log(dia);

//log com a confirmação que o serviço está rodando
console.log('Serviço em funcionamento')

// Mostra o resultado referente ao dia atual com dois dígitos
console.log('Hoje é ' + hoje);

//configurando o email do emissor
/* const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "teste@gmail.com",
      pass: "**************"
    }
  }); */

//Url para realização da requisição dinâmica
const urlR = 'http://redenacionalderadio.com.br/programas/a-voz-do-brasil-completa/'+`${hoje}`+'-voz-do-brasil.mp3/@@download/file/'+`${hoje}`+'-%20-%20VOZ%20DO%20BRASIL.mp3';
const url = 'http://redenacionalderadio.com.br/programas/a-voz-do-brasil-completa/15-01-19-voz-do-brasil.mp3/@@download/file/15-01-19-%20-%20VOZ%20DO%20BRASIL.mp3';

//console.log(urlR);

//função periódica para execução da tarefa programada
const job = new CronJob('00 45 15 * * *', () => {
    request(url).pipe(fs.createWriteStream('Voz do Brasil.mp3'));
    console.log('Download iniciado', hoje, 'às', horas );
    //console.log(url);

    //enviando email de confirmação de download
    /* const mailOptions = {
        from: "teste@gmail.com",
        to: "teste@gmail.com",
        subject: `Download realizado com sucesso ;)`,
        text: `Email automaticamente enviado para confirmar 
        realização do download para o dia de hoje`
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          throw error;
        } else {
          console.log("Email enviado com sucesso!");
        }
      }); */

}, null, true, 'America/Sao_Paulo') 




