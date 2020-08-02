// To run and emulate these functions run: "npm run emulators" from the functions directory

import * as functions from 'firebase-functions'
import { sendNodemailerEmail } from './mailerFunctions'

const admin = require('firebase-admin')
admin.initializeApp()

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// PAth: /helloWorld
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true })
  response.send('Hello from Firebase!')
})

// Take the text parameter passed to this HTTP endpoint and insert it into
// Cloud Firestore under the path /messages/:documentId/original

// PAth: /addMessage
export const addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.body.text // If GET method: req.query.text

  functions.logger.log('req: ', original)
  functions.logger.log('body: ', req.body.jaje)

  // Push the new message into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({ original: original })
  // Send back a message that we've succesfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` })
})

// Listens for new messages added to /messages/:documentId/original and creates an
// uppercase version of the message to /messages/:documentId/uppercase
// also sends a mail if recipient address is provided
export const makeUppercase = functions.firestore.document('/messages/{documentId}').onCreate((snap, context) => {
  // Grab the current value of what was written to Cloud Firestore.
  const original = snap.data().original

  // Access the parameter `{documentId}` with `context.params`
  functions.logger.log('Uppercasing', context.params.documentId, original)

  const uppercase = original.toUpperCase()

  const recipient = ''
  if (recipient) {
    sendNodemailerEmail(original, recipient)
  }

  // You must return a Promise when performing asynchronous tasks inside a Functions such as
  // writing to Cloud Firestore.
  // Setting an 'uppercase' field in Cloud Firestore document returns a Promise.
  return snap.ref.set({ uppercase }, { merge: true })
})
