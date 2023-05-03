// import JSEncrypt from 'jsencrypt'
// import { JSEncrypt } from 'encryptlong'
const { JSEncrypt } = require('encryptlong');

const publicKey="MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCytfRyUBPZ34GKZBJGpqSRg7+XqOfTa3fT31lHQIQ5i4jsfXoBE8ivtcPxZC3Cnt5ZFmeQT2br+gY8NtLaNr5t2zAFyVeI+fmDb75YWadOhcDSAo4xeVhHSPfhagcLC+UxckQ3dzjd0/gZ4SutEB5dLI8coV6RahNmghDzFtrlEQIDAQAB";
const privateKey="MIICXQIBAAKBgQCytfRyUBPZ34GKZBJGpqSRg7+XqOfTa3fT31lHQIQ5i4jsfXoBE8ivtcPxZC3Cnt5ZFmeQT2br+gY8NtLaNr5t2zAFyVeI+fmDb75YWadOhcDSAo4xeVhHSPfhagcLC+UxckQ3dzjd0/gZ4SutEB5dLI8coV6RahNmghDzFtrlEQIDAQABAoGBAIROwdOABbJgDv/uZrl31o8FA2u82SVlgymRSf++fCY+b/jmTNVPWFz+LTsh998Gz4cVV0c4AfLjAIrD7AcyUHi22bMLi+pEmDiBGGqSRnqqgFcAM0P/uubz6Ttw9bv1CSg0TGnYiSWtPlDXleroZiS/yGBVy5/2PYLayYaAdGABAkEA6OVsFZEwkoP1H4WRDRecauyUiHuE5/HWavojofuzxbBBpkTT8mrknAYCAIAe3OiJp/09rzJ9ZmHVXsh5/yOtUQJBAMRwc8VBRUfUy63LkD5qZhSbwYwVm0ncbFCWtiwTCg8DGhqmzQ7wrddOqyhDidGzdNpljOaLMBLm/45YYRCmy8ECQCB9uUl8+vDF1hGyuZzA+YJ1RPeRe+Y79/Tutr/ndJoUz+PZYFRGk2Qs9mSJe0TIcEPucYeanKIG7hSOFW8B1DECQCqcWgCH0Ads2WGxrnBblBkUUD+a0DyNW9F/X7TfzGbFPXxaglCjVJJHtkjdnZ+nVcmqDY5U0vDGutidwzBhfgECQQC/PWfH/XjTo/0iHBXOKfpcG9yd++cFlDyahqN7LqlG+dk2Zojyn88OZMyNiHJO6xxMYUZA4GhObdvLyGBSWFgW";
// 加密函数
export function Encryption(data:string) {
    // var key = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCytfRyUBPZ34GKZBJGpqSRg7+XqOfTa3fT31lHQIQ5i4jsfXoBE8ivtcPxZC3Cnt5ZFmeQT2br+gY8NtLaNr5t2zAFyVeI+fmDb75YWadOhcDSAo4xeVhHSPfhagcLC+UxckQ3dzjd0/gZ4SutEB5dLI8coV6RahNmghDzFtrlEQIDAQAB";
    var encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encryptLong(data);
    // return encrypt.encrypt(data);
}

// 解密函数
export function Decryption(data:string) {
    var encrypt = new JSEncrypt();
    // var key = "MIICXQIBAAKBgQCytfRyUBPZ34GKZBJGpqSRg7+XqOfTa3fT31lHQIQ5i4jsfXoBE8ivtcPxZC3Cnt5ZFmeQT2br+gY8NtLaNr5t2zAFyVeI+fmDb75YWadOhcDSAo4xeVhHSPfhagcLC+UxckQ3dzjd0/gZ4SutEB5dLI8coV6RahNmghDzFtrlEQIDAQABAoGBAIROwdOABbJgDv/uZrl31o8FA2u82SVlgymRSf++fCY+b/jmTNVPWFz+LTsh998Gz4cVV0c4AfLjAIrD7AcyUHi22bMLi+pEmDiBGGqSRnqqgFcAM0P/uubz6Ttw9bv1CSg0TGnYiSWtPlDXleroZiS/yGBVy5/2PYLayYaAdGABAkEA6OVsFZEwkoP1H4WRDRecauyUiHuE5/HWavojofuzxbBBpkTT8mrknAYCAIAe3OiJp/09rzJ9ZmHVXsh5/yOtUQJBAMRwc8VBRUfUy63LkD5qZhSbwYwVm0ncbFCWtiwTCg8DGhqmzQ7wrddOqyhDidGzdNpljOaLMBLm/45YYRCmy8ECQCB9uUl8+vDF1hGyuZzA+YJ1RPeRe+Y79/Tutr/ndJoUz+PZYFRGk2Qs9mSJe0TIcEPucYeanKIG7hSOFW8B1DECQCqcWgCH0Ads2WGxrnBblBkUUD+a0DyNW9F/X7TfzGbFPXxaglCjVJJHtkjdnZ+nVcmqDY5U0vDGutidwzBhfgECQQC/PWfH/XjTo/0iHBXOKfpcG9yd++cFlDyahqN7LqlG+dk2Zojyn88OZMyNiHJO6xxMYUZA4GhObdvLyGBSWFgW";
    encrypt.setPrivateKey(privateKey);
    // return encrypt.decrypt(data);
    return encrypt.decryptLong(data);
}

// 私钥：MIICXQIBAAKBgQCytfRyUBPZ34GKZBJGpqSRg7+XqOfTa3fT31lHQIQ5i4jsfXoB
// E8ivtcPxZC3Cnt5ZFmeQT2br+gY8NtLaNr5t2zAFyVeI+fmDb75YWadOhcDSAo4x
// eVhHSPfhagcLC+UxckQ3dzjd0/gZ4SutEB5dLI8coV6RahNmghDzFtrlEQIDAQAB
// AoGBAIROwdOABbJgDv/uZrl31o8FA2u82SVlgymRSf++fCY+b/jmTNVPWFz+LTsh
// 998Gz4cVV0c4AfLjAIrD7AcyUHi22bMLi+pEmDiBGGqSRnqqgFcAM0P/uubz6Ttw
// 9bv1CSg0TGnYiSWtPlDXleroZiS/yGBVy5/2PYLayYaAdGABAkEA6OVsFZEwkoP1
// H4WRDRecauyUiHuE5/HWavojofuzxbBBpkTT8mrknAYCAIAe3OiJp/09rzJ9ZmHV
// Xsh5/yOtUQJBAMRwc8VBRUfUy63LkD5qZhSbwYwVm0ncbFCWtiwTCg8DGhqmzQ7w
// rddOqyhDidGzdNpljOaLMBLm/45YYRCmy8ECQCB9uUl8+vDF1hGyuZzA+YJ1RPeR
// e+Y79/Tutr/ndJoUz+PZYFRGk2Qs9mSJe0TIcEPucYeanKIG7hSOFW8B1DECQCqc
// WgCH0Ads2WGxrnBblBkUUD+a0DyNW9F/X7TfzGbFPXxaglCjVJJHtkjdnZ+nVcmq
// DY5U0vDGutidwzBhfgECQQC/PWfH/XjTo/0iHBXOKfpcG9yd++cFlDyahqN7LqlG
// +dk2Zojyn88OZMyNiHJO6xxMYUZA4GhObdvLyGBSWFgW

// 公钥：MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCytfRyUBPZ34GKZBJGpqSRg7+X
// qOfTa3fT31lHQIQ5i4jsfXoBE8ivtcPxZC3Cnt5ZFmeQT2br+gY8NtLaNr5t2zAF
// yVeI+fmDb75YWadOhcDSAo4xeVhHSPfhagcLC+UxckQ3dzjd0/gZ4SutEB5dLI8c
// oV6RahNmghDzFtrlEQIDAQAB

