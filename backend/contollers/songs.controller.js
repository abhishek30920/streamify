import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res) => {
  try{
      const songs=await Song.find().sort({createdAt: -1});
      res.status(200).json({songs});

  }
  catch{
    res.status(500).json({message: "Server Error"});
  }
}

export const getFeaturedSongs = async (req, res) => {
  try{
    const songs = await Song.aggregate([
			{
				$sample: { size: 6 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);
    console.log(songs)
		res.json(songs);
  }
  catch{
    res.status(500).json({message: "Server Error"});
  }
}

export const getmadeForUSongs = async (req, res) => {
  try{
      //random songs
      const songs = await Song.aggregate([
        {
          $sample: { size: 4 },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1,
          },
        },
      ]);
  
      res.json(songs);
  }
  catch{
    res.status(500).json({message: "Server Error"});
  }
}

export const getTrendingSongs = async (req, res) => {
  try{
    //random songs
    const songs = await Song.aggregate([
			{
				$sample: { size: 4 },
			},
			{
				$project: {
					_id: 1,
					title: 1,
					artist: 1,
					imageUrl: 1,
					audioUrl: 1,
				},
			},
		]);

		res.json(songs);
  }
  catch{
    res.status(500).json({message: "Server Error"});
  }
}