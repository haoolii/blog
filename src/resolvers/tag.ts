import { Resolver } from "type-graphql";

@Resolver()
export class TagResolver {
  /** Get Tags List */
  async tags() {}

  /** Get Single Tag */
  async tag() {}

  /** Create Tag */
  async createTag() {}

  /** Delete Tag */
  async deleteTag() {}

  /** Update Tag */
  async updateTag() {}
}
