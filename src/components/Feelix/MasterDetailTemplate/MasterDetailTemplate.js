import {
  Button, Card, Container, Icons, PageHead,
} from '@myob/myob-widgets';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import StickyHeader from '../StickyHeader/StickyHeader';

const STICKY_NONE = 'none';
const STICKY_ALL = 'all';

function getReactElementPosition(element) {
  const node = element.current || element;
  const parentPos = node.offsetParent;
  return {
    top:
      node.offsetTop
      && parentPos.offsetTop
      && node.offsetTop - parentPos.offsetTop,
    left:
      node.offsetLeft
      && parentPos.offsetLeft
      && node.offsetLeft - parentPos.offsetLeft,
    height: node.offsetHeight,
    width: node.offsetWidth,
    boundingClientRect: node.getBoundingClientRect(),
  };
}

const isNil = e => e === undefined || e === null;

const MasterDetailTemplateClose = ({ onClick }) => (
  <div className="flx-masterdetail-detail__close">
    <Button type="secondary" size="xs" onClick={onClick}>
      <Icons.Cross />
    </Button>
  </div>
);

MasterDetailTemplateClose.propTypes = {
  onClick: PropTypes.func,
};
MasterDetailTemplateClose.defaultProps = {
  onClick: () => {},
};

/**
 * MasterDetailTemplate
 *
 * @visibleName
 * @see Last updated: v5.11.0
 */
class MasterDetailTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detailHeight: '0px',
      isMobile: false,
    };
    this.stickyEl = undefined;
    this.actionContainerRef = undefined;
    this.contentContainerRef = undefined;
    this.windowResizeListener = undefined;
    this.headerRef = undefined;
    this.wrapperRef = undefined;
    this.wrapperStyle = undefined;
  }

  componentDidMount() {
    const { scrollRef } = this.props;
    scrollRef.addEventListener('resize', this.onResize);
    scrollRef.addEventListener('scroll', this.onScroll);
    this.onResize();
  }

  componentDidUpdate() {
    this.updateDetailHeight();
  }

  componentWillUnmount() {
    const { scrollRef } = this.props;
    scrollRef.removeEventListener('resize', this.onResize);
    scrollRef.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    this.updateDetailHeight();
  };

  onResize = () => {
    this.updateIsMobile();
    this.updateDetailHeight();
  };

  setContentContainerRef = (ref) => {
    this.contentContainerRef = ref;
  };

  setWrapperRef = (ref) => {
    this.wrapperRef = ref;
  };

  setHeaderRef = (ref) => {
    this.headerRef = ref;
  };

  getDetailTopOffset() {
    const { nonStickyDetailOffsetTop, sticky } = this.props;
    switch (sticky) {
      case STICKY_NONE:
        return nonStickyDetailOffsetTop;
      default:
        return this.headerRef
          ? this.headerRef.getBoundingClientRect().bottom
          : 0;
    }
  }

  prefixClass = section => `flx-masterdetail__${section}`;

  modifierClasses = (section, showDetail) => {
    const modifierClass = showDetail
      ? `${this.prefixClass(section)}--shown`
      : `${this.prefixClass(section)}--hidden`;
    return modifierClass;
  };

  classes = (section) => {
    const { sectionClassName } = this.props;
    return classnames(
      `flx-masterdetail__${section}`,
      sectionClassName && `${sectionClassName}__${section}`,
    );
  };

  updateIsMobile = () => {
    const { detailMobileBreakpoint } = this.props;
    const { isMobile } = this.state;
    const viewPortWidth = getReactElementPosition(this.wrapperRef).width;

    const currentDevice = viewPortWidth <= detailMobileBreakpoint;
    if (isMobile === currentDevice) {
      return;
    }
    this.setState({ isMobile: currentDevice });
  };

  updateDetailHeight = () => {
    const { detailHeight } = this.state;
    const currentDetailHeight = this.calcDetailHeight();
    if (detailHeight === currentDetailHeight) {
      return;
    }

    this.setState({
      detailHeight: currentDetailHeight,
    });
  };

  calcDetailHeight() {
    const { nonStickyDetailOffsetTop, detailOffsetBottom } = this.props;
    if (isNil(this.headerRef)) {
      return 0;
    }

    const toTop = getReactElementPosition(this.headerRef).boundingClientRect
      .bottom;

    const availableHeight = toTop < nonStickyDetailOffsetTop
      ? `calc(100vh - ${nonStickyDetailOffsetTop}px - ${detailOffsetBottom}px)`
      : `calc(100vh - ${toTop}px - ${detailOffsetBottom}px)`;

    return availableHeight;
  }

  renderSwitch({
    alert, pageHead, subHead, filterBar,
  }) {
    const { sticky } = this.props;
    const { isMobile } = this.state;
    if (isMobile) {
      return this.renderNonStickyHeader({
        alert,
        pageHead,
        subHead,
        filterBar,
      });
    }
    switch (sticky) {
      case STICKY_NONE:
        return this.renderNonStickyHeader({
          alert,
          pageHead,
          subHead,
          filterBar,
        });
      default:
        return this.renderStickyHeader({
          alert, pageHead, subHead, filterBar,
        });
    }
  }

  renderNonStickyHeader({
    alert, pageHead, subHead, filterBar,
  }) {
    return (
      <div className="flx-template__header" ref={this.setHeaderRef}>
        {alert}
        {pageHead}
        {subHead}
        {filterBar}
        <div style={{ height: '1px', marginTop: '-1px' }} />
      </div>
    );
  }

  renderStickyHeader({
    alert, pageHead, subHead, filterBar,
  }) {
    return (
      <StickyHeader reference={this.setHeaderRef}>
        {alert}
        {pageHead}
        {subHead}
        {filterBar}
      </StickyHeader>
    );
  }

  renderContentInMobile() {
    const {
      showDetail, detail, master, actions,
    } = this.props;

    return (
      <div className="flx-masterdetail" ref={this.setContentContainerRef()}>
        {detail && (
          <aside
            className={classnames(
              this.classes('detail'),
              `${this.prefixClass('detail')}--mobile`,
              this.modifierClasses('detail', showDetail),
            )}
          >
            {detail}
          </aside>
        )}
        <section
          className={classnames(
            this.classes('master'),
            `${this.prefixClass('master')}--mobile`,
            this.modifierClasses('master', !showDetail),
          )}
        >
          {master}
          {actions && this.renderActions()}
        </section>
      </div>
    );
  }

  renderDetailForNonMobile() {
    const { showDetail, detail, detailWidth } = this.props;
    const { detailHeight } = this.state;
    const style = { flexBasis: detailWidth };
    if (!showDetail) {
      return (
        detail && (
          <aside
            className={classnames(
              this.classes('detail'),
              `${this.prefixClass('detail')}--hidden`,
            )}
          >
            {detail}
          </aside>
        )
      );
    }

    const detailTopOffset = this.getDetailTopOffset();

    const stickyContent = (
      <aside
        className={classnames(this.classes('detail'), `${this.prefixClass('detail')}--shown`)}
        style={{
          ...style, height: detailHeight, position: 'sticky', top: detailTopOffset,
        }}
      >
        <div
          className="flx-masterdetail__detail-content"
          style={{ height: detailHeight }}
        >
          {detail}
        </div>
      </aside>
    );

    return (
      stickyContent
    );
  }

  renderContentForNonMobile() {
    const { master, actions } = this.props;

    return (
      <div
        className="flx-masterdetail"
        ref={(ref) => {
          this.contentContainerRef = ref;
        }}
      >
        <section className={classnames(this.classes('master'))}>
          {master}
          {actions && this.renderActions()}
        </section>
        {this.renderDetailForNonMobile()}
      </div>
    );
  }

  renderContent() {
    const { isMobile } = this.state;
    return isMobile
      ? this.renderContentInMobile()
      : this.renderContentForNonMobile();
  }

  renderActions() {
    const { actions } = this.props;
    return (
      <div
        className="flx-template__footer"
        ref={(ref) => {
          this.actionContainerRef = ref;
        }}
      >
        {actions}
      </div>
    );
  }

  render() {
    const {
      cozy,
      wcagAA,
      fluid,
      templateClassName,
      containerClassName,
      pageHead,
      alert,
      filterBar,
      subHeadChildren,
    } = this.props;

    const templateClasses = classnames(
      'flx-template',
      'flx-template-masterdetail',
      templateClassName,
    );

    const safePageHead = typeof pageHead === 'string' ? <PageHead title={pageHead} /> : pageHead;
    const safeAlert = alert && (
      <div className="flx-template__alert">{alert}</div>
    );
    const safeSubHead = subHeadChildren && (
      <div className="flx-template__sub-head">{subHeadChildren}</div>
    );
    const safeFilterBar = filterBar && <Card>{filterBar}</Card>;

    return (
      <Container
        fluid={fluid}
        cozy={cozy}
        wcagAA={wcagAA}
        className={containerClassName}
        reference={this.setWrapperRef}
      >
        <div className={templateClasses}>
          {this.renderSwitch({
            alert: safeAlert,
            pageHead: safePageHead,
            subHead: safeSubHead,
            filterBar: safeFilterBar,
          })}
          {this.renderContent()}
        </div>
      </Container>
    );
  }
}

MasterDetailTemplate.defaultProps = {
  pageHead: null,
  alert: null,
  detail: null,
  actions: null,
  containerClassName: null,
  templateClassName: null,
  cozy: false,
  wcagAA: false,
  fluid: false,
  sticky: STICKY_ALL,
  nonStickyDetailOffsetTop: 12,
  detailOffsetBottom: 12,
  detailWidth: '340px',
  filterBar: undefined,
  subHeadChildren: undefined,
  sectionClassName: undefined,
  detailMobileBreakpoint: 768,
  scrollRef: window,
};

MasterDetailTemplate.Close = MasterDetailTemplateClose;

export default MasterDetailTemplate;
