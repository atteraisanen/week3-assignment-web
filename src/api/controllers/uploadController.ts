// TODO: create a controller to send the data of uploaded cat
// to the client
// data to send is described in UploadMessageResponse interface

import { Request, Response, NextFunction } from "express";
import { Point } from 'geojson';
import CustomError from "../../classes/CustomError";

const catPost = async (req: Request<{}, {}, {}, {}, {coords: Point}>, res: Response, next: NextFunction) => {
    try {
        if(!req.file) {
            const error = new CustomError("No file sent", 400);
            throw error;
        }

        const response = {
            message: "File uploaded successfully",
            data: {
                filename: req.file.filename,
                location: res.locals.coords,
            }
        };
        res.json(response);
    } catch (error) {
        next(new CustomError((error as Error).message, 400));
    }
}

export { catPost }
