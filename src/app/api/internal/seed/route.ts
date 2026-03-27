import { timingSafeEqual } from 'node:crypto'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { runSeed } from '../../../../../scripts/seed-prod.ts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 300

function getProvidedSecret(request: NextRequest) {
	const bearerToken = request.headers.get('authorization')?.match(/^Bearer (.+)$/i)?.[1]

	return request.headers.get('x-seed-secret') ?? bearerToken ?? null
}

function secretsMatch(expected: string, provided: string) {
	const expectedBuffer = Buffer.from(expected)
	const providedBuffer = Buffer.from(provided)

	if (expectedBuffer.length !== providedBuffer.length) {
		return false
	}

	return timingSafeEqual(expectedBuffer, providedBuffer)
}

export async function POST(request: NextRequest) {
	const expectedSecret = process.env.SEED_ROUTE_SECRET

	if (!expectedSecret) {
		return NextResponse.json(
			{ error: 'SEED_ROUTE_SECRET is not configured.' },
			{ status: 500 },
		)
	}

	const providedSecret = getProvidedSecret(request)

	if (!providedSecret || !secretsMatch(expectedSecret, providedSecret)) {
		return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
	}

	try {
		await runSeed({
			assetBaseURL: request.nextUrl.origin,
		})

		return NextResponse.json({
			ok: true,
			message:
				'Seed completed successfully. Remove this route and unset SEED_ROUTE_SECRET after verification.',
		})
	} catch (error) {
		console.error('Remote seed failed.')
		console.error(error)

		const message =
			error instanceof Error ? error.message : 'Unknown error while running seed.'

		return NextResponse.json(
			{
				error: 'Seed failed.',
				message,
			},
			{ status: 500 },
		)
	}
}
