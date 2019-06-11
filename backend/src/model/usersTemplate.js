const mongoose = require("mongoose");
const CONFIG = require("../config");

mongoose
  .connect(CONFIG.DB_ADRESS, { useNewUrlParser: true })
  .then(res => console.log("Connection to DB established"))
  .catch(err => console.log(err));

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isAdmin: { type: Boolean, default: false },
  friends: { type: Array, required: true, default: [] },
  requests_to_confirm: {
    type: Array,
    required: true,
    default: [],
    of: {
      type: String,
      unique: true,
      require: true
    }
  },
  waiting_for_confirmation: {
    type: Array,
    required: true,
    default: [],
    of: {
      type: String,
      unique: true,
      require: true
    }
  },
  last_activity:{
    type: Date,
    required: true,
    default: Date.now()
  }
});

var User = mongoose.model("users", UserSchema);

module.exports = User;

/*

var config = {
    //La fiecare autentificare cu succes se adauga o cheie si id-ul utilizatorului
    cheieDeAutorizarePentruUtilizatoriLogati: [
        {id_ul_utilizatorului,
        cheia_pe_care_a_primit_o}
    ],
    users: [{
            id,
            status,
            ultima_data_logat,
            personalData: {
                nume,
                prenume,
                telefon,
                link_poza,
                email
            },
            authData: {
                username,
                parola
            },
            prieteni: [
                id
            ],
            cerere_de_prietenie: [
                id
            ],
            conversatii: [{
                    cu_cine_id,
                    data_ultim_mesaj,
                    culoare_conversatie,
                    este_citita,
                    messaje: [{
                            esteMesajulDeLaMine: [false || true],
                            mesajul,
                            data_mesajului,
                        }
                    ]
                }
            ]
        }
    ],
}

*/
