from Crypto.Cipher import AES, PKCS1_OAEP
from Crypto.Util.number import long_to_bytes
from Crypto.Util.Padding import unpad
from Crypto.PublicKey import RSA #you could also use ECC for this. The principle is the same, though.


def decrypt(data: bytes, gmac: bytes, kn: bytes, privKey: RSA.RsaKey)->bytes:
    kcipher = PKCS1_OAEP.new(privKey)
    k = kcipher.decrypt(kn)
    key = k[:16]
    nonce = k[16:]
    cipher = AES.new(key,AES.MODE_GCM,nonce=nonce)
    return unpad(cipher.decrypt_and_verify(data,gmac),AES.block_size)

if __name__ == "__main__":
    data = b''
    gmac = b''
    kn = b''
    with open("./input.json","rb") as f:
        datalen = int(f.readline().decode("utf-8").strip(),10)
        data = f.read(datalen)
        gmac = f.read(16)
        kn = f.read()
    agent_key = None
    with open("./k.pem","rb") as f:
        agent_key = RSA.import_key(f.read())
    
    print(decrypt(data,gmac,kn,agent_key))
