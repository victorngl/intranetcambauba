import { parseForm, FormidableError } from "../../../../lib/parse-form";

const handler = async (req, res) => {

    try {
        const { fields, files } = await parseForm(req, 'comunicados');

        const file = files.media;

        console.log(fields);

        let url = Array.isArray(file) ? file.map((f) => f.filepath) : file.filepath;

        res.status(200).json({
            data: {
                url,
            },
            error: null,
        });
    } catch (e) {
        if (e instanceof FormidableError) {

            res.status(e.httpCode || 400).json({ data: null, error: e.message });
        } else {
            console.error(e);
            res.status(500).json({ data: null, error: "Internal Server Error" });
        }
    }
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;