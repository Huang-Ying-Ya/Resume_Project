/**
 * @desc 技能
 * @author huangying
 */
import React from 'react';
import './index.less';

function Skill() {
  return (
    <div styleName="content">
      <p styleName="label">技能证书 Skill</p>
      <ul styleName="skill">
        <li styleName="item">
          语言能力：大学英语四、六级证书（四级556，六级533），能够熟练用英文进行交流、读写;
        </li>
        <li styleName="item">
          专业能力：掌握各类Office软件，如Word、Excel等；编程语言方面，熟悉C、Python、Java、JavaScript、Go;
          软件开发方面，熟悉前端开发框架React、Vue，了解后端开发框架Gin，熟悉PostgreSQL数据库，了解MySQL数据库，熟悉
          SQL 语句的编写;
        </li>
        <li styleName="item">
          团队能力：具有丰富的团队组建、扩充经验和项目管理与协调经验，不管是进行活动组织还是业务开发都能够独挡一面;
        </li>
        <li styleName="item">
          沟通能力： 沟通能力：善于与他人交流，拥有较强的表述能力和沟通能力。
        </li>
      </ul>
    </div>
  );
}

export default Skill;
