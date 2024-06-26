"use strict";
const functions = require('firebase-functions'); //ver: "firebase-functions": "^4.3.1"
const admin = require('firebase-admin'); //ver: "firebase-admin": "^11.8.0"
const nodemailer = require('nodemailer'); //ver: "nodemailer": "^6.9.3"
const environments = require('.././environments.ts');
admin.initializeApp();
// Firestoreの対象ドキュメントをonCreateトリガーとする。今回はresultドキュメント配下のすべてを対象とする。
exports.sendEmail = functions.firestore.document('/result/{documentId}')
    .onCreate(async (snap, context) => {
    // トリガー対象のドキュメントからデータを取得する
    const resultData = snap.data();
    const to = resultData.email;
    // メール内容
    const subject = 'メールのタイトルです。';
    const message = 'メールの内容です。';
    const from = environments.MAIL;
    const pass = environments.PASS;
    try {
        // SMTPトランスポータの作成
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: from,
                pass: pass
            }
        });
        // メールオプションの設定
        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: message
        };
        // メール送信
        const info = await transporter.sendMail(mailOptions);
        console.log('メールが送信されました:', info.response);
    }
    catch (error) {
        console.error('メールの送信中にエラーが発生しました:', error);
    }
});
//# sourceMappingURL=index.js.map