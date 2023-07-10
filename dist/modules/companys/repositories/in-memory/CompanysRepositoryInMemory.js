"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CompanysRepositoryInMemory = void 0;
class CompanysRepositoryInMemory {
  constructor() {
    this.repository = [];
  }
  async create(data) {
    throw new Error("Method not implemented.");
  }
  async list() {
    throw new Error("Method not implemented.");
  }
  async listByUserId(idUsers) {
    throw new Error("Method not implemented.");
  }
  async findById(id) {
    throw new Error("Method not implemented.");
  }
  async findByName(name) {
    throw new Error("Method not implemented.");
  }
  async updateById(data) {
    throw new Error("Method not implemented.");
  }
  async deleteById(id) {
    throw new Error("Method not implemented.");
  }
}
exports.CompanysRepositoryInMemory = CompanysRepositoryInMemory;