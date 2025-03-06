import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import TestCase from '@/models/TestCase';

export async function GET() {
    await connectDB();
    const testCases = await TestCase.find();
    return NextResponse.json(testCases, { headers: { 'Access-Control-Allow-Origin': '*' } });
  }
  
  export async function POST(req) {
    await connectDB();
    const { title, description, status, assignedTo } = await req.json();
    const newTestCase = new TestCase({ title, description, status, assignedTo });
    await newTestCase.save();
    return NextResponse.json(newTestCase, { status: 201, headers: { 'Access-Control-Allow-Origin': '*' } });
  }
  