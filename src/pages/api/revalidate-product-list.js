// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { NextApiRequest, NextApiResponse } from "next";
import slugify from "slugify";

import axiosClient from "@/libraries/axiosClient";

export default async function handler(req, res) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_SECRET_REVALIDATION_KEY) {
    return res.status(401).json({ message: "Invalid token" });
  }
  
  try {
    const { categoryId } = req.query;
    const category = await axiosClient.get(`/categories/${categoryId}`);

    const convertToEnglishAndSlug = (name) => {
      const slug = slugify(name, {
        lower: true,
        strict: true,
        remove: /[^A-Za-z0-9-\s]+/g,
        replacement: "-",
      });

      return slug;
    };

    const categoryPath = convertToEnglishAndSlug(category.data?.payload.name);

    await res.revalidate(`/thuc-don/${categoryPath}`); // URL trong page muốn revalidate
    return res.json({ revalidated: true });
  } catch (err) {
    console.log('««««« err »»»»»', err);
    return res.status(500).send({ message: "Error revalidating" });
  }
}
