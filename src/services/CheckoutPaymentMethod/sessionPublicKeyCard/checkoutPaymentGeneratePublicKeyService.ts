import {api} from '../../../constants/configs/fetchConfig'



class CheckoutPaymentGeneratePublicKeyService {
    async execute({type}: {type: string}){
      if(!type){
        return {
          data: {
            message: "Não é possível prosseguir com a ação, envie o tipo de chave que você deseja gerar (Tipos Aceitos: card)",
            status: 400
          }
        }
        
      }

      let responsePublicKey: any = await fetch(`${process.env.PAGBANK_URL}/public-keys/card`, {
        method: "POST",
        headers: {
          'accept': '*/*', 
          "Content-Type": "application/json",
          "Authorization": process.env.PAGBANK_TOKEN!,
        },
        body: JSON.stringify({ type })
      });  
      
      // Consuma o corpo da resposta apenas uma vez
      const responseBody = await responsePublicKey.json();
          return {
            data: {
              items: responsePublicKey.error_messages ? "Ocorreu erros na API PAGBANK referênte ao public key" : responseBody,
              status: responsePublicKey.error_messages ? 400 : 200,
            },
           
          }
          
        /*
  Gerar chave publica para cartão.
   let res = await fetch("https://sandbox.api.pagseguro.com/public-keys", {
  
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "ce083154-c165-4bcb-98eb-c2edac5f7cb4f56c670c4b14816fe45364fa84e46c8fc0ac-7223-4c15-b5d1-bd537eaac2da",
    },
   body: JSON.stringify({
    "type":"card"
   })
  
  })

  minha public key: 

  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB
  
  minha sessão 

  "YZUit0Sx3CPgr/RN9O37nxozU20mPJ3lXRTrgVUaB4eiwtSdwH6jhCG9LaVb7PurgOaA3/fmfQRJsMXOKJMLdM8Z7loqQF+wJhtFZb17qlL4hQYkZLHR0ecCqYT9XshtWYaKrUCUe04c4GGm15g8enxQvnl/XGAiU1XY88KuZy8Ls0PKtAKjeOXkAdNumecMt79W4u1VEIGWw+lQ9TDzoN/3pPvExTFYitb3lk4BDhlwakhcTb07ct28zhH2f7T0ReItF9O5RlKnk7Up8WtuHV6zX5mKkSNV9hRYKx6VuLcm9XmEqC+HTiySAAQ/MeHUQccIw2PN5DOcJNpVT+nunw=="
  */


    }
}

export {CheckoutPaymentGeneratePublicKeyService}