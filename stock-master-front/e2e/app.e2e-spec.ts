import { StockMasterFrontPage } from './app.po';

describe('stock-master-front App', () => {
  let page: StockMasterFrontPage;

  beforeEach(() => {
    page = new StockMasterFrontPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
