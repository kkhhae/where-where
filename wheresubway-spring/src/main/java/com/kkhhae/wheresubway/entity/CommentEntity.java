package com.kkhhae.wheresubway.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "comments")
@Table(name="comments")
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int commentId;
    private int boardId;
    private int userId;
    private String commentUserProfile;
    private String commentUserNickname;
    private String commentWriteDate;
    private String commentContent;

}
