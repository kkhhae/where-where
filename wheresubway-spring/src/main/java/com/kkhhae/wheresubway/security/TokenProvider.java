package com.kkhhae.wheresubway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

//JWT : 전자서명 토큰
//JSON 형태로 구성됨
//{header}.{payload}.{signature}
//header : typ(토큰의 타입), alg (토큰 서명을 위해 사용된 해시 알고리즘)
//payload : sub(토큰의 주인), iat(토큰발행시간), exp(토큰만료시간)

@Service
public class TokenProvider {

    //JWT 생성 + 검증용 키 만들기
    private static final String SECURITY_KEY = "jwtseckey!@";

    public String create(String userEmail){
        //만료시간을 현재시간의 + 1시간으로 설정
        Date exprTime = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        //암호화 빌딩 (JWT 만들기)
        return Jwts.builder()
                //암호화 용 알고리즘에 키 넣기
                .signWith(SignatureAlgorithm.HS512, SECURITY_KEY)
                .setSubject(userEmail)      //JWT 제목(만들거)
                .setIssuedAt(new Date())    //생성일
                .setExpiration(exprTime)    //만료일
                .compact();                 //생성하기
    }

    //검증(파싱)
    public String validate(String token){
                        //token으로 받은 값을 사용해 디코딩(복호화함)
        Claims claims = Jwts.parser().setSigningKey(SECURITY_KEY)
                //파싱할 키 값 가져오기
                .parseClaimsJws(token).getBody();

        //복호화된 토큰의 payload에서 제목 가져옴
        return claims.getSubject();
    }
}
