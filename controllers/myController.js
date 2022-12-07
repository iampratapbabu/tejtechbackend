 var jose = require('node-jose');

let demofun = () =>{
	return "hello";
}


let makeKeys = async () => {
    let privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWt7tv/0kzAgII
+EvF+rlMbyDCaAmArQBQzhI85uBCWzaX+/i2FqjWjhKJsm1Q6ABI2Z9KHydKfYbg
4MlX5BPpyhfWXynaY7APV77Rv6MJO7ctfUj5qcDC+VX3DSTWotonTluAKvQU06V7
uqRh76KwyPL5E7N2L+dJ2wql8ulvfIYwMepLxtM/j2ciCASwuZMmW0K+XG9ZFDLt
c59UhBaxYeA08S+d4PL4MHSqK4+SY5Q0slnsh5NrIk82yM8s1i13WAIWDioyMIWj
RPaRzWYY3I8qkj5vDGPu+ISWJvsarBFNUiUYrKyLMv15XdrOj6NLhPra5/ca5G1D
z1lmI1PFAgMBAAECggEAJBmG63kNywQi6HQqdTJGtimW5eiM9HPhsjQ7T773ZGCm
iJ4F/kNIBq6jQkBb7bbb2WOxSsp7FiSNqUBRybOgf3WJVXLxe/S3tJSpkeU42YQP
M5g1TThznrRB9kPg9i8yI1qiuqU+HURKNce2/HpILZXTd/oOeafrKHkpzKXPBn2n
lQxrGdEU8yFUtAQjCmIDBijXNPkQJFw7RecHCadDvui7EXW7Ydr2yRYH4JbCltDo
Hy971VmkDa1JS5IITWIpoBUy9tpYeT9Mawk5r6Hkh7rThvzDxk46JrW7DLwFzMHi
jr0lPn0cPY3if5ZfAD+bHm6GK2elk4/6hBKs8xD4IQKBgQD9XpO0OEUVoE+mybwN
Zvg0AVtCRBBOsFt6VpKKBqUCBkvahvLfmg6UhWV1oIiQPgJpkZwnrmXbE9nzBKv8
frP1OpRYDKaNHiQRK+nYOzLEULRSxpmBwKjSPTjHp5T4pgwvi303FoATmRmgx+S/
r3bHj7N+jTpUoa3RSgv3SEh+EQKBgQDY8myFyQ/a0mQye9kTAWGdx0pLaRwc0NBt
iqPFYE/Y/Rb5rNApnonIovvbgrc31/yW6lSLF5CAGLTfocEZdqcL2AEI6P+K32Id
E6I+QMYw99AO50IaUqOjDSQrysb4S8OMwQOMZprk1ah95REBaSDvY3Ie5OkOHyuG
ZukUUChWdQKBgQCTwrBJDffcIN3S2xt8hWyCh7f88UzBV0BCHHLhY/afM6TREJpb
pLCUFSeSbci2tjMZ9f0ndyGXngAhJbxXSF0SytLwdpA7BDTsfruliwCUVKyVCZVE
gmLyGRof9a9/QvcgUyz3D3wp8cNsbKcO0vlmcHuxdhNqf8+qmpBX6iO8wQKBgCZR
EtfCPjmgxS+hbiKMMOiEBVwyUVPJkbZ3MRuwOgoSEVfBrPZc2OsF1kPb325OiH9D
HfF/FPd65Z9F22wa58AQw4YGWPP3JkYKbLJgEGEfs7CeKa+qftpSfNv7MY8zGnOm
t3C5wou+LMcniQxdvAJr5wEL3xmuaaqQTIRY7/btAoGBANSSfNE2hOHracN2RhnB
D7x6auHkX21s7YY7qX3lvqWXXcTpFyV47NLRTRwTVT0ezPyUz83jS5V+02KiprmP
UBVGDZtqsR2XycwzBDLh4SOUe+ZYQCGV6+IZQmgwbY3zP4wRxPfiNje84p8WF2du
COK/k/96yBBBTJ55ae/uBEnS
-----END PRIVATE KEY-----`;
    let publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxO+O52a1eAkbYatqpPAk
vhTz5VAdNloWhbmAmwPPo8660VKxU+yOCbwZSU8NqwVubHMgnxdycgJw+zGslXgz
zHPpmA5evOY2AVjpcE9avKfp523M5gxOaAnQCxat6KxORIJWLSF84EUtrzLIxgle
bvDyhfoHMGVSYiP89UQPTR+uu6irFRkdu2zFDPOx2/4XdtyAbJlWdj4Fes0v3CcA
/jDO9EmwVEiySCuagLWnrvHvCV0mCDN167JSVjeeKZy4Q36WyF0VqytxmW+mXn+m
IfcLlj5vXSXp81pI1Iyg86KZtW3A6dP8QuRlYwHJU7Z+m7AeIHtC+ol0/eBPYPwk
PQIDAQAB
-----END PUBLIC KEY-----`

	let keyres;

    const jwKeys = await Promise.all([
        jose.JWK.asKey(privateKey, "pem"),
        jose.JWK.asKey(publicKey, "pem")
    ]);
    let keystore = jose.JWK.createKeyStore();
    await keystore.add(jwKeys[0]);
    await keystore.add(jwKeys[1]);
    var output = keystore.toJSON(true);
   console.warn("make keys function runs")
   console.log(output);


   jose.JWS.createSign(jwKeys[0]).
        update("6cbe6e75-ef83-4382-9111-7355dd0d6fbc").
        final().
        then(function(result) {
          // {result} is a JSON object -- JWS using the JSON General Serialization
          console.log("Jws key",result);
           keyres=result;
        });

      return keyres;

}


exports.demoMiddleware = (req,res,next) =>{
  console.log("middleware runs");
  next();
};


exports.getDashboard = (req,res)=>{
  res.send("GET this is dashboard route");
}

exports.generateToken = (req,res) =>{
	//res.send(demofun());
	res.send(makeKeys());
	//res.json({"status":"Success"})
	
}





