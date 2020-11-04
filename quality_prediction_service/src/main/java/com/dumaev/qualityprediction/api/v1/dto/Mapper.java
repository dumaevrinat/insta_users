package com.dumaev.qualityprediction.api.v1.dto;


import com.dumaev.qualityprediction.entity.Caption;
import com.dumaev.qualityprediction.entity.Media;
import com.dumaev.qualityprediction.entity.User;
import com.dumaev.qualityprediction.entity.UserFeatures;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Mapper {

    private final ModelMapper modelMapper;

    @Autowired
    public Mapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public CaptionDTO convertToDTO(Caption caption) {
        return modelMapper.map(caption, CaptionDTO.class);
    }

    public Caption convertToEntity(CaptionDTO captionDTO) {
        return modelMapper.map(captionDTO, Caption.class);
    }

    public MediaDTO convertToDTO(Media media) {
        return modelMapper.map(media, MediaDTO.class);
    }

    public Media convertToEntity(MediaDTO mediaDTO) {
        return modelMapper.map(mediaDTO, Media.class);
    }

    public UserDTO convertToDTO(User user) {
        return modelMapper.map(user, UserDTO.class);
    }

    public User convertToEntity(UserDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }

    public UserFeaturesDTO convertToDTO(UserFeatures userFeatures) {
        return modelMapper.map(userFeatures, UserFeaturesDTO.class);
    }

    public UserFeatures convertToEntity(UserFeaturesDTO userFeaturesDTO) {
        return modelMapper.map(userFeaturesDTO, UserFeatures.class);
    }
}
