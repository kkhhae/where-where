package com.kkhhae.wheresubway.repository;

import com.kkhhae.wheresubway.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity,Integer> {

    public List<BoardEntity> findTop3ByBoardWriterDateAfterOrderByBoardLikeCountDesc(Date date);

    public List<BoardEntity> findByOrderByBoardWriterDateDesc();

    public List<BoardEntity> findByBoardTitleContains(String boardTitle);
}
