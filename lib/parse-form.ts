import type { NextApiRequest } from "next";
import { join } from "path";
import formidable from "formidable";
import { mkdir, stat } from "fs/promises";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (req: NextApiRequest, folder: string): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
   
  return await new Promise(async (resolve, reject) => {
    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      `public/uploads`, folder
    );
    
    try {
       
      await stat(uploadDir);
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await mkdir(uploadDir, { recursive: true });
      } else {
        console.error(e);
        reject(e);
        return;
      }
    }
    
    const form = formidable({
      maxFiles: 10,
      maxFileSize: 1024 * 1024 * 10, // 10mb
      uploadDir,
      filename: (_name, _ext, part) => {
        
        const originalName = part.originalFilename
         
        let filename = Date.now() + ' - ' + originalName;
        //const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        //const filename = `${part.name || "unknown"}-${uniqueSuffix}.${
        //  mime.getExtension(part.mimetype || "") || "unknown"
        //}`;
        
        return filename;
      },
      filter: (part) => {
        //let filterExtension = part.originalFilename.match(/\.(pdf)$/i);
        //let filterBool = filterExtension==null?false:true;
        //return filterBool
        return true;
      },
      
    });
    
    form.parse(req, function (err, fields, files) {
      if (err) {
        reject(err);
      }
      else resolve({ fields, files });
    });
  });
};