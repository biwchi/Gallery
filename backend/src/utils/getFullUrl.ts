import { Request } from 'express'

export const getFullUrl = (req: Request) => `${req.protocol}://${req.get('Host')}/api`  