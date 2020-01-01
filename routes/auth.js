const express = require('express');
const router = express.Router();

//bcrypt 설치시 오류 발생할 경우 - 비밀번호 암호화
//npm i -g windows-build-tools을 먼저 설치
//npm i bcrypt@3.0.6 버전
const bcrypt = require('bcrypt');
const { User } = require('../models');

router.post("/join", async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {

    }catch(error){

    }
});

module.exports = router;