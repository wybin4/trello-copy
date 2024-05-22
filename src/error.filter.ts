import { HttpStatus, NotFoundException, ConflictException, InternalServerErrorException, UnprocessableEntityException, BadRequestException, GatewayTimeoutException } from "@nestjs/common";

export function CatchError(e) {
    if (e.status === HttpStatus.NOT_FOUND) {
        throw new NotFoundException(e.message);
    } else if (e.status === HttpStatus.CONFLICT) {
        throw new ConflictException(e.message);
    } else if (e.status === HttpStatus.UNPROCESSABLE_ENTITY) {
        throw new UnprocessableEntityException(e.message);
    } else if (e.status === HttpStatus.BAD_REQUEST_EXISTS) {
        throw new BadRequestException(e.message);
    } else if (e.status === HttpStatus.GATEWAY_TIMEOUT) {
        throw new GatewayTimeoutException(e.message);
    }
    else throw new InternalServerErrorException(e.message);
}