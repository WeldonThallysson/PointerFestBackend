

class CheckoutPaymentConsultPublicKeyService {
    async execute(){
        let responsePublicKey: any = await fetch(`${process.env.PAGBANK_URL}/public-keys/card`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.PAGBANK_TOKEN
          },
        })

        
      const responseBody = await responsePublicKey.json();
 
          return {
            data: {
              items: responsePublicKey.error_messages ? "Ocorreu erros na API PAGBANK referênte ao public key" : responseBody,
              status: responsePublicKey.error_messages ? 400 : 200,
            },
           
          }
          
        /*
  Gerar chave publica para cartão.
 
  
  })

  minha public key: 

  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB
  
  minha sessão 

  "YZUit0Sx3CPgr/RN9O37nxozU20mPJ3lXRTrgVUaB4eiwtSdwH6jhCG9LaVb7PurgOaA3/fmfQRJsMXOKJMLdM8Z7loqQF+wJhtFZb17qlL4hQYkZLHR0ecCqYT9XshtWYaKrUCUe04c4GGm15g8enxQvnl/XGAiU1XY88KuZy8Ls0PKtAKjeOXkAdNumecMt79W4u1VEIGWw+lQ9TDzoN/3pPvExTFYitb3lk4BDhlwakhcTb07ct28zhH2f7T0ReItF9O5RlKnk7Up8WtuHV6zX5mKkSNV9hRYKx6VuLcm9XmEqC+HTiySAAQ/MeHUQccIw2PN5DOcJNpVT+nunw=="
  */


    }
}

export {CheckoutPaymentConsultPublicKeyService}