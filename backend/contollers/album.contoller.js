import { Album } from "../models/album.model.js";

export const getAllAlbums = async (req, res) => {
  try {
    console.log("get all albums");

    // Populate the songs field with Song data
    const albums = await Album.find();
    res.status(200).json({albums});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAlbumById = async (req, res) => {
  try{
    const albumId = req.params.id
  console.log(albumId)
		const album = await Album.findById(albumId).populate("songs");

		if (!album) {
			return res.status(404).json({ message: "Album not found" });
		}

		res.status(200).json(album);


  }
  catch(error){
    console.log(error)
    res.status(500).json({message: "Server Error"});

  }
}