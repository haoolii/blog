import { Migration } from '@mikro-orm/migrations';

export class Migration20210917173652 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "category" drop constraint "category_parent_id_foreign";');
    this.addSql('alter table "category" drop column "parent_id";');
  }

}
