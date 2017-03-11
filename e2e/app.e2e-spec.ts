import { DesafioMaplinkPage } from './app.po';

describe('desafio-maplink App', () => {
  let page: DesafioMaplinkPage;

  beforeEach(() => {
    page = new DesafioMaplinkPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
