package com.kkhhae.wheresubway.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="PopularSearch")
@Table(name = "popularsearch")
public class PopularSearchEntity {

    @Id
    private String popularTerm;
    private int popularSearchCount;
}
