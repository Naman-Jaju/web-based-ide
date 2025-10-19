import { templatePaths } from "@/lib/template";
import path from "path";
import fs from "fs";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { readTemplateStructureFromJson, saveTemplateStructureToJson } from "@/features/playground/lib/path-to-json";


function ValidateJsonStructure(data: any): boolean {
    try{
        JSON.parse(JSON.stringify(data));
        return true;
    }catch{
        console.error("Invalid JSON structure", data);
        return false;
    }
}

export async function GET(
    request: NextRequest,
    {params}: {params: Promise<{id: string}>}
){
    const { id } = await params;

    if(!id){
        return Response.json({error: "Missing playground ID"}, {status: 400});
    }

    const playground = await db.playground.findUnique({
        where: {
            id,
        },
    });
    
    if(!playground){
        return Response.json({error: "Playground not found"}, {status: 404});
    }

    const templateKey = playground.template as keyof typeof templatePaths;
    const templateRelativePath = templatePaths[templateKey];

    if(!templateRelativePath){
        return Response.json({error: "Invalid template key"}, {status: 400});
    }

    try{
        const inputPath = path.join(process.cwd(), templateRelativePath);
        const outputFile = path.join(process.cwd(), `output/${templateKey}.json`);

        await saveTemplateStructureToJson(inputPath, outputFile);
        const data = await readTemplateStructureFromJson(outputFile);

        if(!ValidateJsonStructure(data)){
            return Response.json({error: "Invalid template structure"}, {status: 500});
        }

        await fs.unlinkSync(outputFile);

        return Response.json({success: true, templateJson: data}, {status: 200});

    }catch(error){
        return Response.json({error: "Failed to process template"}, {status: 500});
    }
}