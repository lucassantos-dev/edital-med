import { hash as _hash } from 'bcrypt'
const password = 'password' // Substitua pela senha que você quer criptografar

_hash(password, 10, (err, hash) => {
  if (err) {
    console.error(err)
  } else {
    console.log('Senha criptografada:', hash)
  }
})
