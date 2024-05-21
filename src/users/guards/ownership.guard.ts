import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { UserService } from "../services/user.service";

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(
        private userService: UserService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const userId = parseInt(request.params.userId);
        const userIdFromJwt = request.user.userId;

        if (userId === userIdFromJwt) {
            const userEntity = await this.userService.findOne(userId);
            if (userEntity) {
                return true;
            } else {
                throw new ForbiddenException('Пользователь не найден');
            }
        } else {
            throw new ForbiddenException('Доступ запрещен: Вы не являетесь владельцем ресурса');
        }
    }
}