import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AUTH_TOKEN = process.env.AUTH_TOKEN || 'admin-token-123';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token');

    if (token?.value === AUTH_TOKEN) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}

