import Photo from "../models/photoModel.js";
import { v2 as cloudinary } from 'cloudinary';  //cloudinary'nin 2. versiyonunu import eder.
import fs from "fs"

const createPhoto = async (req, res) => {

    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,                   //yuklenen medya dosyasinin gecici olarak saklandigi path i temsil eder.
        {
            use_filename: true,
            folder: 'lenslight_tr',
        }
    );



    try {
        await Photo.create({
            name: req.body.name,
            description: req.body.description,
            user: res.locals.user._id,
            url: result.secure_url,         //cloudinary isleminden sonra medya dosyasinin güvenli URL'sini atadik.
        });

        fs.unlinkSync(req.files.image.tempFilePath) //temp(tmp) dosyasinda yuklenen resimleri siler. Yani tmp dosyasinda resimler yuklenmez.

        res.status(201).redirect("/users/dashboard");

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};

const getAllPhotos = async (req, res) => {
    try {
        const photos = res.locals.user
        ? await Photo.find({user: { $ne: res.locals.user._id } })     // ternary operator . Eger user varsa filtrelemeyi ona göre yap yoksa filtreleme yapma  dedik.
        : await Photo.find({});
        res.status(200).render('photos', {
            photos,
            link: 'photos',
        });


    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};


const getAPhoto = async (req, res) => {
    try {
        const photo = await Photo.findById({_id: req.params.id}).populate("user");  //photo uzerinden user a gidebiliriz,  populate() ile.
        res.status(200).render('photo', {
            photo,
            link: 'photos',
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};

export { createPhoto, getAllPhotos, getAPhoto };