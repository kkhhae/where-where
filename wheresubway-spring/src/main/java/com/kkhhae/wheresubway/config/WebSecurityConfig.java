package com.kkhhae.wheresubway.config;

import com.kkhhae.wheresubway.security.CustomUserDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {


    //remember me기능 사용할 때 필요함
    private CustomUserDetailsService userDetailsService;

    private DataSource dataSource; //remember-me를 db에 저장하기 위해 필요


    //HttpSecurity (구 : configure(HttpSecurity http))
    //시큐리티 접근 제한, 로그인, 로그아웃 등 http관련 설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
            .authorizeHttpRequests(request -> request
//                    .requestMatchers("/user/signIn", "/user/signUp").permitAll()
                            .anyRequest().permitAll()
//                    .anyRequest().authenticated()	// 어떠한 요청이라도 인증필요
            )
            .formLogin(login -> login	// form 방식 로그인 사용
                    .loginPage("/signIn")
                    .usernameParameter("userEmail")
                    .passwordParameter("password")
                    .defaultSuccessUrl("/main", true)	// 성공 시 이동
                    .failureUrl("/error")
                    .permitAll()	//
            )
            .logout(logout-> logout
                    .logoutSuccessUrl("/main")
                    .invalidateHttpSession(true)// 로그아웃은 기본설정으로 (/logout으로 인증해제)
            )
            .rememberMe(rememberMe -> rememberMe
                    .tokenRepository(tokenRepository(dataSource))
                    .userDetailsService(userDetailsService)
            )
        ;

        return http.build();
    }

    //WebSecurity : 시큐리티 적용 안할 경로 지정
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer(){ //css, js, 이미지파일 등
        return (web) -> web
                .ignoring()
                .requestMatchers("/assets/**");

    }

    //AuthenticationManager : 시큐리티 인증 담당, UserDetailsService가 구현클래스, PasswordEncoder가 필요함.
    @Bean
    public AuthenticationManager authenticationManager
    (AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    //BCryptPassword : 비밀번호 암호화 해주는 클래스 빈으로 등록 (시큐리티에서 비밀번호 암호화 강제함.필수사용)
    //암호화된 비밀번호 자체는 복호화가 불가능함
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    //데이터베이스 사용한 remember-me 적용 시, DB에 직접 접속해 insert,delete 처리 자동으로 해줌
    @Bean
    public PersistentTokenRepository tokenRepository(DataSource dataSource) {
        JdbcTokenRepositoryImpl tokenRepository = new JdbcTokenRepositoryImpl();
        tokenRepository.setDataSource(dataSource);
        return tokenRepository;
    }
}