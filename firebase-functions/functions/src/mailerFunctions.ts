const nodemailer = require('nodemailer')

export function sendNodemailerEmail(content: string, toAddress: string) {
  if (!toAddress.trim()) {
    return
  }
  // Nodemailer example
  let transport = nodemailer.createTransport({
    // host: 'smtp.mailtrap.io',
    // port: 2525,
    // auth: {
    //   user: '',
    //   pass: ''
    // }
    service: 'gmail',
    auth: {
      user: '',
      pass: '' // naturally, replace both with your real credentials or an application-specific password
    }
  })

  const message = {
    to: toAddress, // List of recipients
    subject: 'Email test', // Subject line
    html: `<p><b>${content}</b> </p>
    <div><i>test</i></div>`
  }

  transport.sendMail(message, (err: any, info: any) => {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}
