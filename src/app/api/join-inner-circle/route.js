import JoinInnerCircle from "@/lib/modals/JoinInnerCircle";
import dbConnect from "@/lib/utils/dbConnect";

export async function POST(req) {
  await dbConnect();

  try {
    const { fullName, linkedinOrWebsite, email, message } = await req.json();

    if (!fullName || !email) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Name and Email are required",
        }),
        { status: 400 }
      );
    }

    const newEntry = await JoinInnerCircle.create({
      fullName,
      linkedin: linkedinOrWebsite,
      email,
      message,
    });

    return new Response(JSON.stringify({ success: true, data: newEntry }), {
      status: 201,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const entries = await JoinInnerCircle.find().sort({ createdAt: -1 });
    return new Response(JSON.stringify({ success: true, data: entries }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
      }
    );
  }
}
