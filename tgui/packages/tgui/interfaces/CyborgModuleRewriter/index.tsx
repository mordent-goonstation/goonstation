/**
 * @file
 * @copyright 2020
 * @author Mordent (https://github.com/mordent-goonstation)
 * @license ISC
 */

import { Window } from '../../layouts';
import { ModuleView } from './ModuleView';
import * as styles from './styles';

export const CyborgModuleRewriter = () => {
  return (
    <Window
      width={670}
      height={640}
    >
      <Window.Content className={styles.Block} scrollable>
        <ModuleView />
      </Window.Content>
    </Window>
  );
};
