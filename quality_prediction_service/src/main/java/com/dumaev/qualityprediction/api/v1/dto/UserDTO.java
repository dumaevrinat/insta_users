package com.dumaev.qualityprediction.api.v1.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    private Boolean isN;
    private Double probability;

    private String username;
    private Integer id;

    @NotNull
    private String bio;
    @NotNull
    private String fullName;
    @NotNull
    private Boolean hasMedia;
    @NotNull
    private Boolean isBusinessAccount;
    @NotNull
    private Boolean isJoinedRecently;
    @NotNull
    private Integer followedByCount;
    @NotNull
    private Integer followCount;
    @NotNull
    private Integer felixVideoCount;
    @NotNull
    private Integer mediaCount;
    @NotNull
    private Integer highlightReelCount;
    @NotNull
    private List<MediaDTO> mediaList;
}
