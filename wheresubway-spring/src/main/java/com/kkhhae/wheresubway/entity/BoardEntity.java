package com.kkhhae.wheresubway.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="Board")
@Table(name="board")
public class BoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private int boardId ;
    private String boardTitle;
    private String boardContent;
    private String boardImage;
    private String boardVideo;
    private String boardFile;
    private String boardWriterEmail;
    private String boardWriterProfile;
    private String boardWriterNickname;
    private Date boardWriterDate;
    private int boardClickCount;
    private int boardLikeCount;
    private int boardCommentCount;
}
