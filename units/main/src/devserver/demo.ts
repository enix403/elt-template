process.env.NODE_ENV = 'development';

import { MikroORM } from '@mikro-orm/core';
import { Post } from '~/core/database/Post';

import { configureApplicationPaths } from '~/pathutils';
configureApplicationPaths('', true);

process.env.APP_PATHS_CONFIGURED = 'yes';
import config from '~/core/mikro-orm.config';

async function main() {
    const orm = await MikroORM.init(config);
    await orm.getMigrator().up()

    // const post = orm.em.create(Post, { title: "A title", content: "Some content" });
    // await orm.em.persistAndFlush(post);

    const posts = await orm.em.find(Post, {});
    console.log(posts);
}

main().then(() => process.exit(0));
