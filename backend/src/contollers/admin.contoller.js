import { Song } from "../models/song.model.js";
import { Album } from './../models/album.model.js';
import cloudinary from '../lib/cloudinary.js'


const uploadToCloudinary = async (file,req,res) => {
  try{
    const result=await cloudinary.uploader.upload(file.tempFilePath,{
      resource_type:"auto",
    }
  )
  console.log(result);
return result.secure_url;
  }catch(error){
    console.error(error);
    res.status(500).json({message: "Server Error uploading file to cloudinary"});

  }

}

export const checkadmin = async (req, res, next) => {
	res.status(200).json({ admin: true });
};
export const createSong = async(req, res) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
			return res.status(400).json({ message: "Please upload all files" });
		}

		const { title, artist, albumId, duration } = req.body;
		const audioFile = req.files.audioFile;
		const imageFile = req.files.imageFile;

		const audioUrl = await uploadToCloudinary(audioFile);
		const imageUrl = await uploadToCloudinary(imageFile);


  
    const song=new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId :albumId || null
    });
      await song.save();
// update the album
      if(albumId){
        const album = await Album.findById(albumId);
        album.songs.push(song._id);
        await Album.save();
      }
      res.status(201).json({message: "Song created successfully", song});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const songId = req.params.id;
    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }
    await Song.findByIdAndDelete(songId);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}


export const createAlbum = async(req, res) => {
  try {
    if(!req.files || !req.files.imageFile){
      return res.status(400).json({message: "Please upload image file"})
    }
    const {title,artist,releaseYear} = req.body;
    const imageFile = req.files.imageFile;

    const imageUrl=await uploadToCloudinary(imageFile);
    const album=new Album({
      title,
      artist,
      releaseYear,
      imageUrl
    });
      await album.save();
      res.status(201).json({message: "Album created successfully", album});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteAlbum = async (req, res) => {
  try{
    const albumId = req.params.id;
    const album = await Album.findById(albumId);
    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }
    await Song.deleteMany({albumId: albumId});
    await Album.findByIdAndDelete(albumId);
    res.status(200).json({ message: "Album deleted successfully" });

  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: "Server Error" });
 
  }
} 

