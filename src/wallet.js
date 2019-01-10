var https = require("https");
var crypto = require('crypto');
function createPrivateKey (){
    return zcrypto.sha256(Buffer)
}


function send(fromaddr,frompubkey, toaddr, ammount){

    var url='https://api.blockcypher.com/v1/btc/test3/addrs/'+fromaddr+'/full?limit=50?unspentOnly=true&includeScript=true'


    var options = {
        host: 'api.blockcypher.com',
        port: 443,
        path: '/v1/btc/test3/addrs/'+fromaddr+'/full?limit=50?unspentOnly=true&includeScript=true',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    var port = options.port == 443 ? https : http;
    var req = port.request(options, function(res)
    {
        var output = '';
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            //console.log(obj);

            var tx = {
                version:'02000000',
                flag:'0001',
                inputCount:'01',
                inputprevhash:'1333183ddf384da83ed49296136c70d206ad2b19331bf25d390e69b222165e37',
                inputprevoutputhindex:'00000000',
                inputscriptlength:'00',
                inputsequence:'feffffff',
                outputcount:'02',
                output1value:'',
                output1publickeyscriptlength:'',
                output1publickeyscript:'',
                output2value:'',
                output2publickeyscriptlength:'',
                output2publickeyscript:'',
                locktime:''

        };


            var hash1 = crypto.createHash('sha256');
            var hash2 = crypto.createHash('ripemd160');

            var hash1out = hash1.update(frompubkey,'hex').digest('hex');
            var hashfinal = hash2.update(hash1out,'hex').digest('hex');

            var scriptsig = '0014'+hashfinal;


            var txdata = getTxData(obj,ammount,fromaddr);

            tx.inputprevhash = txdata.hash;






            if(txdata==null)return"could not find a valid tx, does the wallet have enough in it's balance? May also need to combine some utxos";




        });
    });

    req.on('error', function(err) {
        return "could not get tx data from given address";
    });

    req.end();
}


function getTxData(jsonData,ammount,fromaddr){

    var output = null;

    jsonData.txs.forEach(function(element) {

        element.outputs.forEach(function(out) {

            if(out.addresses.indexOf(fromaddr)>-1){

                if(out.value >= ammount){
                    output= {
                        hash:element.hash,
                        ammount:out.value

                    };
                    return;
                }

            }

        });

    });
    return output;

}

module.exports = {
    send: function (fromaddr, toaddr, ammount) {
        return send(fromaddr, toaddr, ammount);
    },
    bar: function () {
        // whatever
    }
};