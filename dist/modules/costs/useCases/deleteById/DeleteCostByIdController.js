"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteCostByIdController = void 0;
var _DeleteCostByIdUseCase = require("./DeleteCostByIdUseCase");
var _tsyringe = require("tsyringe");
class DeleteCostByIdController {
  async handle(request, response) {
    const {
      idCost
    } = request.params;
    const deleteCostByIdUseCase = _tsyringe.container.resolve(_DeleteCostByIdUseCase.DeleteCostByIdUseCase);
    await deleteCostByIdUseCase.execute({
      id: idCost
    });
    return response.status(200).json({
      message: 'Deleted Cost successfully.'
    });
  }
}
exports.DeleteCostByIdController = DeleteCostByIdController;