import autobind from 'autobind-decorator';
import { Injectable } from '@kaokei/use-vue-service';
import { cloneDeep } from 'lodash-es';
import type { Pagination } from '~/types/common';
import { QUERY_KEY_FOR_MODEL } from '~/utils/constant';
import type { RouterService } from './router.service';

@Injectable()
export class SearchService {
  // 查询接口的loading状态
  public loading = false;
  // 用户不能修改的属性，但是仍然需要传递给查询接口
  public extraModel = {} as any;
  // model转化为接口提交的对象需要特殊处理，VO转TO
  public model2TOParserMap = {} as any;
  // model序列化到URL时特殊字段处理
  public modelStringifierMap = {} as any;
  // model反序列化URL中特殊字段处理
  public modelParserMap = {} as any;
  // 和表单双向绑定的对象
  public defaultModel = {} as any;
  // 和表单双向绑定的对象
  public model = {} as any;
  // 用于在url上存储model的key
  public QUERY_KEY_FOR_MODEL = QUERY_KEY_FOR_MODEL;
  // 当前是第几页，从1开始
  public pageNum = 1;
  // 接口需要的字段名称
  public pageNumKey = 'currentPage';
  // 当前分页大小
  public pageSize = 20;
  // 接口需要的字段名称
  public pageSizeKey = 'limit';
  // 默认的表格的分页大小
  public DEFAULT_PAGE_SIZE = 20;

  // 由子类去注入，被继承的类不能使用@Inject
  public routerService!: RouterService;
  public constructor(rs?: RouterService) {
    if (rs) {
      // 由子类注入routerService
      // 如果子类没有注入，说明不需要持久化到URL
      // 比如弹窗内部的表格分页
      this.routerService = rs;
    }
  }

  /**
   * model对象不能修改，必须使用cloneDeep
   * 用于后续重置表单
   */
  private getDefaultModel() {
    return cloneDeep(this.defaultModel);
  }

  /**
   * 需要持久化的数据模型
   * 主要是包含pageNum和pageSize
   */
  private getSavingModel() {
    return {
      ...this.model,
      pageNum: this.pageNum,
      pageSize: this.pageSize,
    };
  }

  /**
   * 用于提交给接口的数据模型
   */
  public getFormModel() {
    const data = this.model2TO(this.model);
    return {
      ...data,
      ...this.extraModel,
      [this.pageNumKey]: this.pageNum,
      [this.pageSizeKey]: this.pageSize,
    };
  }

  /**
   * @override
   * 由子类实现从localStorage中获取当前pageSize
   */
  public getDefaultPageSize() {
    return this.DEFAULT_PAGE_SIZE;
  }

  public resetPageNum(num?: number) {
    this.pageNum = num || 1;
  }

  public resetPageSize(size?: number) {
    this.pageSize = size || this.getDefaultPageSize();
  }

  public resetModel(newModel?: any) {
    if (newModel && Object.keys(newModel).length > 0) {
      this.model = newModel;
    } else {
      this.model = this.getDefaultModel();
    }
  }

  /**
   * 点击搜索按钮调用的函数
   */
  @autobind
  public search() {
    this.resetPageNum();
    this.saveModelThenQuery();
  }

  /**
   * 点击重置按钮调用的函数
   */
  @autobind
  public reset() {
    this.resetPageNum();
    this.resetPageSize();
    this.resetModel();
    this.saveModelThenQuery();
  }

  /**
   * 表格翻页时调用的函数
   */
  @autobind
  public onPageChange() {
    this.saveModelThenQuery();
  }

  /**
   * 修改表格分页大小时调用的函数
   */
  @autobind
  public onPageSizeChange() {
    this.resetPageNum();
    this.saveModelThenQuery();
  }

  /**
   * 工具方法
   * 先把model对象序列化后保存到URL中，再进行查询操作
   */
  private saveModelThenQuery() {
    this.saveModel();
    return this.query();
  }

  /**
   * @override
   * 可以由子类重新实现
   * 主要是持久化model对象
   */
  public saveModel() {
    if (this.routerService) {
      const modelstring = this.modelToString(this.getSavingModel());
      this.routerService.updateQuery({
        [this.QUERY_KEY_FOR_MODEL]: modelstring,
      });
    }
  }

  /**
   * @override
   * 必须由子类实现的搜索方法
   */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  public query(): Promise<void | Pagination<any>> {
    throw new Error('query method must be implemented inside Search Service');
  }

  /**
   * 使用refresh代替query方法来刷新数据
   * 主要是解决当前页面没有数据时，主动切换到第一页，避免显示空页面
   */
  public refresh() {
    return this.query().then((res) => {
      // const isOut = (res.current - 1) * res.size >= res.total;
      // if (res.current > 1 && res.records.length === 0 && isOut) {
      if (res && res.current > 1 && res.records.length === 0) {
        // 分页超过总数边界，重新搜索第一页
        return this.search();
      }
    });
  }

  /**
   * 这个方法主要用于页面加载和spa页面跳转时避免重复触发的问题
   * 这个方法类似saveModelThenQuery，只不过没有修改URL，而是假设URL已经有变化
   * @param query
   */
  public queryIfUrlChanged(query: any) {
    const querystring = query[this.QUERY_KEY_FOR_MODEL];
    const curModelString = this.modelToString(this.getSavingModel());
    if (querystring !== curModelString) {
      this.queryFromUrl(query);
    }
  }

  /**
   * 页面加载时直接从URL读取查询参数
   * @param query
   */
  public queryFromUrl(query: any) {
    const querystring = query[this.QUERY_KEY_FOR_MODEL];
    const { pageNum, pageSize, ...newModel } =
      this.modelFromString(querystring);
    this.resetPageNum(pageNum);
    this.resetPageSize(pageSize);
    const defaultModel = this.getDefaultModel();
    this.resetModel(Object.assign({}, defaultModel, newModel));
    this.query();
  }

  /**
   * 在调用查询接口之前，需要对model对象进行一定的转化
   * 比如开始日期和结束日期在model中是一个数组，传递给接口时需要变成两个属性
   * 比如多选字段是一个数组，传递给接口时需要转换成逗号拼接的字符串
   * @param model
   */
  public model2TO(model: any) {
    return Object.keys(model).reduce((acc, key) => {
      const value = model[key];
      const func: any = this.model2TOParserMap[key];
      if (func) {
        const stringifyValue = func(value);
        if (stringifyValue && typeof stringifyValue === 'object') {
          return { ...acc, ...stringifyValue };
        } else if (stringifyValue !== undefined) {
          return { ...acc, [key]: stringifyValue };
        } else {
          return acc;
        }
      } else {
        acc[key] = value;
        return acc;
      }
    }, {} as any);
  }

  /**
   * model的序列化方法，会在query方法中调用
   * 用于在序列化之后保存到URL中
   * @param model
   */
  public modelToString(model: any) {
    return JSON.stringify(model, (key, value) => {
      const func = this.modelStringifierMap[key];
      return func ? func(value) : value;
    });
  }

  /**
   * model的反序列化方法
   * 用于从URL中读取model字符串
   * @param querystring
   */
  public modelFromString(querystring: string) {
    try {
      return JSON.parse(querystring, (key, value) => {
        const func = this.modelParserMap[key];
        return func ? func(value) : value;
      });
    } catch (error) {
      return {};
    }
  }
}
