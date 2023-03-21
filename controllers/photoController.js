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
            image_id: result.public_id,     //mongoDB de image_id ekledik. Bu image_id resimin public_id sine sahiptir.
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

        let isOwner  = false        //eger photo yu biz yuklemediysek UPDATE ve DELETE butonları gorulmeyecek.
        if(res.locals.user) {

            isOwner= photo.user.equals(res.locals.user._id)
        }



        res.status(200).render('photo', {
            photo,
            link: 'photos',
            isOwner,
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};

const deletePhoto = async (req, res) => {
    try {

        const photo = await Photo.findById(req.params.id);

        const photoId = photo.image_id;                 //photo_id yi photonun image_id sine atadik.

        await cloudinary.uploader.destroy(photoId);     //cloudinary den photo silmek icin, destroy silme islemini baslatir.

        await Photo.findByIdAndRemove({ _id: req.params.id});       //veritabanindan photo yu silmek icin

        res.status(200).redirect("/users/dashboard");


    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};

const updatePhoto = async (req, res) => {
    try {

        const photo = await Photo.findById(req.params.id);     //update etmek istedigimiz photoyu yakaladik.

        if(req.files) {
            const photoId = photo.image_id;
            await cloudinary.uploader.destroy(photoId);

        const result = await cloudinary.uploader.upload(        //photo update ederek yeni phpto eklemek icin
            req.files.image.tempFilePath,
            {
                use_filename: true,
                folder: 'lenslight_tr',
            }
        );


        photo.url = result.secure_url
        photo.image_id = result.public_id

        fs.unlinkSync(req.files.image.tempFilePath) //temp(tmp) dosyasinda yuklenen resimleri siler. Yani tmp dosyasinda resimler yuklenmez.

        }

        photo.name = req.body.name;
        photo.description = req.body.description;

        photo.save(); //photoyu kayıt ettik.

        res.status(200).redirect(`/photos/${req.params.id}`);


    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        });
    }
};





export { createPhoto, getAllPhotos, getAPhoto, deletePhoto, updatePhoto };