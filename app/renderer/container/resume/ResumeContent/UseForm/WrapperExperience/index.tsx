import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './index.less';
import Left from './Left';
import Right from './Right';
import Menu from './Right/Menu';
import { onAddExperience, onDeleteExperience } from './utils';
import { AdapterExperienceType } from './adapter';
import MyModal from '@common/components/MyModal';

interface IProps {
  dataList: any[];
  updateDataList: (newDataList: any[]) => void;
  children: React.ReactNode;
}

function WrapperExperience({ children, dataList, updateDataList }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentItem, setCurrentItem] = useState<AdapterExperienceType>({});
  const [experienceList, setExperienceList] = useState<AdapterExperienceType[]>([]);

  // 删除状态
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    deleteIndex: -1,
  });
  // 编辑状态
  const [editModal, setEditModal] = useState({
    showByCancel: false, // 编辑下的取消弹窗
    showBySave: false, // 编辑下的保存弹窗
    status: false, // 编辑的状态
    tempSaveItem: {}, // 暂时保存的数据
    onAfterFn: () => {}, // 操作之后的执行方法
  });

  // 1. 初次当条目列表不为空，默认选中第一条
  useEffect(() => {
    if (dataList && dataList?.length > 0) {
      setCurrentIndex(0);
    }
  }, []);

  // 2. 当条目数据列表修改更新，则更新数据
  useEffect(() => {
    if (dataList && dataList?.length > 0) {
      setExperienceList(dataList || []);
    } else {
      setExperienceList([]);
    }
  }, [dataList]);

  // 3. 当条目索引发生改变，更新当前选中的条目数据
  useEffect(() => {
    if (currentIndex >= 0) {
      setCurrentItem(experienceList[currentIndex]);
    }
  }, [currentIndex, experienceList]);

  // 4. 删除条目
  // 点击删除条目
  const onDeleteItem = (index: number) => {
    setDeleteModal({
      show: true,
      deleteIndex: index,
    });
  };
  // 删除弹窗的取消按钮回调
  const onDeleteCancel = useCallback(() => {
    setDeleteModal({
      show: false,
      deleteIndex: -1,
    });
  }, [currentIndex, deleteModal]);
  // 删除弹窗的确定按钮回调
  const onDeleteOk = useCallback(() => {
    const newList = onDeleteExperience(deleteModal.deleteIndex, experienceList);
    if (newList.length > 0) setCurrentIndex(0);
    else setCurrentIndex(-1);
    setDeleteModal({
      show: false,
      deleteIndex: -1,
    });
    setExperienceList(newList);
    updateDataList && updateDataList(newList);
  }, [currentIndex, deleteModal]);

  // 5. 修改选中的条目
  const onChangeItem = useCallback(
    (index: number) => {
      // 5.1 当前正在编辑状态
      if (editModal.status) {
        onToggleEditModal({
          showByCancel: true, // 取消编辑内容，弹窗显示
          onAfterFn: () => { // 确定取消，则新增条目
            setCurrentIndex(index);
          },
        });
      } else {
        setCurrentIndex(index);
      }
    },
    [editModal]
  );

  // 6. 添加条目
  const onAddItem = () => {
    // 判断是否处于编辑态
    if (editModal.status) {
      // 修改编辑状态
      onToggleEditModal({
        showByCancel: true, // 取消编辑内容，弹窗显示
        onAfterFn: () => { // 确定取消，则新增条目
          const newList = onAddExperience(experienceList);
          if (newList.length > 0) {
            // 定位激活刚添加的这条数据
            setCurrentIndex(0);
            setExperienceList(newList);
            updateDataList && updateDataList(newList);
          }
        },
      });
    } else {
      const newList = onAddExperience(experienceList);
      if (newList.length > 0) {
        // 定位激活刚添加的这条数据
        setCurrentIndex(0);
        setExperienceList(newList);
        updateDataList && updateDataList(newList);
      }
    }
  };

  // 修改编辑状态
  const onToggleEditModal = useCallback(
    (config) => {
      setEditModal((prev) => {
        return {
          ...prev,
          ...config,
        };
      });
    },
    [editModal]
  );

  // 点击“保存”时触发
  const onSaveEditValue = useCallback(() => {
    let newList = [...experienceList];
    let item = editModal?.tempSaveItem ? { ...editModal?.tempSaveItem } : { ...currentItem };
    newList[currentIndex] = item;
    setExperienceList(newList);
    updateDataList && updateDataList(newList);
    onToggleEditModal({
      status: false,
    });
  }, [editModal?.tempSaveItem, currentIndex, onToggleEditModal]);

  // 二、定义form组件中修改当前条目数据源的方法
  // 修改当前条目内容
  const onChangeCurrentItem = useCallback(
    // 当数据源更新，同步修改整个数组
    // 临时存储当前编辑的内容数据
    (newItem: AdapterExperienceType) => {
      onToggleEditModal({
        tempSaveItem: { ...newItem },
      });
      // 这里是为了保证Form表单显示的数据实时性和一致性
      setCurrentItem(newItem);
    },
    [children, onToggleEditModal]
  );
   
  // 基于 React 提供的 useMemo Hook 实现： 在组件渲染时，对某个值进行缓存
  // [children, currentItem, editModal?.status, onChangeCurrentItem] 
  // 是一个依赖数组，是 useMemo 的第二个参数，它用于确定何时需要重新计算 memoized 值
  // 当 children、currentItem、editModal 的 status、和 onChangeCurrentItem 发生改变时，useMemo 函数就会重新计算 newForm 数组的值
  const newForm = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        // 三、核心：给子组件注入两个属性：当前条目与修改当前条目的方法
        return React.cloneElement(child, {
          isDisable: !editModal?.status,
          currentItem,
          onChangeCurrentItem,
        });
      }
      return child;
    });
  }, [children, currentItem, editModal?.status, onChangeCurrentItem]);

  return (
    <div styleName="form">
      <div styleName="left-box">
        <Left
          index={currentIndex}
          experienceList={experienceList}
          onAdd={onAddItem}
          onChange={onChangeItem}
          onDelete={onDeleteItem}
        />
      </div>
      <div styleName="right-box">
        {experienceList.length > 0 && (
          <Right>
            <Menu
              isEdit={editModal?.status}
              currentItem={currentItem}
              onChangeEditStatus={() => onToggleEditModal({ status: true, tempSaveItem: { ...currentItem } })}
              onCancelEditValue={() => onToggleEditModal({ showByCancel: true })}
              onSaveEditValue={onSaveEditValue}
            />
            {newForm}
          </Right>
        )}
      </div>
      {deleteModal.show && (
        <MyModal.Confirm
          title="确定删除条目吗？"
          description="删除后将无法恢复哦～"
          config={{
            cancelBtn: {
              isShow: true,
              callback: onDeleteCancel,
            },
            submitBtn: {
              isShow: true,
              callback: onDeleteOk,
            },
          }}
        />
      )}
      {editModal.showByCancel && (
        <MyModal.Confirm
          title="你确定放弃编辑的笔记内容？"
          description="放弃后将无法恢复哦～"
          config={{
            cancelBtn: {
              isShow: true,
              callback: () => {
                onToggleEditModal({
                  showByCancel: false,
                });
              },
            },
            submitBtn: {
              isShow: true,
              callback: () => {
                onToggleEditModal({
                  status: false,
                  showByCancel: false,
                  tempSaveItem: {},
                });
                editModal?.onAfterFn && editModal?.onAfterFn();
                setCurrentItem(experienceList[currentIndex]);
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default WrapperExperience;
