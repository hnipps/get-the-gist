import { h, Fragment } from "preact";
import { useState, useCallback, useEffect } from "preact/hooks";

import Gist from "../../components/gist/Gist";
import List from "../../components/list/List";
import ListItem from "../../components/list/components/ListItem";
import Header from "../../components/header/Header";
import Accordion from "../../components/accordion/Accordion";
import GistItemForm from "../../components/create-gist-form/CreateGistForm";
import Footer from "../../components/footer/Footer";
import Heading from "../../components/heading/Heading";
import Overlay from "../../components/overlay/Overlay";
import Dialog from "../../components/dialog/Dialog";
import CopyToClipboard from "../../components/copy-to-clipboard/CopyToClipboard";

import "./main.css";

const Main = ({ currentTab, createGist }) => {
  const [selectedSnippets, setSelectedSnippets] = useState([]);
  const [gistDescription, setGistDescription] = useState();
  const [isCreatingGist, setIsCreatingGist] = useState(false);
  const [snippetList, setSnippetList] = useState();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [snippetListStatus, setSnippetListStatus] = useState(
    "No snippets found."
  );
  const [showOverlay, setShowOverlay] = useState(false);
  const [lastGistUrl, setLastGistUrl] = useState();

  const handleSnippetRetrieval = useCallback(
    result => {
      if (typeof currentTab !== "undefined")
        setSnippetList(result.snippets[currentTab].codeSnippets);

      if (isRefreshing) setIsRefreshing(false);
    },
    [currentTab, isRefreshing, setIsRefreshing, setSnippetList]
  );

  const retrieveSnippets = useCallback(() => {
    chrome.storage.local.get(["snippets"], handleSnippetRetrieval);
  }, [handleSnippetRetrieval]);
  useEffect(() => retrieveSnippets(), [retrieveSnippets]);

  const handleCreateGistClick = useCallback(
    (snippets, description) => event => {
      event.preventDefault();

      const files = snippets.reduce(
        (acc, { filename, code }, i) => ({
          ...acc,
          [filename || `file${i}`]: { content: code }
        }),
        {}
      );

      setIsCreatingGist(true);
      createGist(files, description).then(({ data: { html_url: url } }) => {
        setIsCreatingGist(false);
        setLastGistUrl(url);
        setShowOverlay(true);
      });
    },
    [setIsCreatingGist, createGist, setLastGistUrl, setShowOverlay]
  );

  const handleAddSnippet = codeBlock => () => {
    const newSelectedSnippets = [...selectedSnippets, codeBlock].sort(
      (a, b) => a.order - b.order
    );
    setSelectedSnippets(newSelectedSnippets);
  };

  const handleRemoveSnippet = codeBlock => () => {
    const newSelectedSnippets = selectedSnippets
      .filter(snip => snip.id !== codeBlock.id)
      .sort((a, b) => a.order - b.order);
    setSelectedSnippets(newSelectedSnippets);
  };

  const handleGistDescriptionChange = useCallback(
    ev => setGistDescription(ev.target.value),
    [setGistDescription]
  );

  const handleSnippetFilenameChange = codeBlock =>
    useCallback(
      ev => {
        const newSnippets = [
          ...snippetList.filter(block => block.id !== codeBlock.id),
          { ...codeBlock, filename: ev.target.value }
        ].sort((a, b) => a.order - b.order);
        setSnippetList(newSnippets);
      },
      [setSnippetList, snippetList, codeBlock]
    );

  const findSnippets = useCallback(
    () =>
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "find_snippets" });
      }),
    []
  );

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setSnippetListStatus("Looking for code snippets...");
    findSnippets();
  }, [setIsRefreshing, setSnippetListStatus, findSnippets]);

  useEffect(
    () =>
      chrome.storage.onChanged.addListener(
        ({ snippets: { newValue } }, area) => {
          if (area === "local") {
            handleSnippetRetrieval({ snippets: newValue });
          }
        }
      ),
    [handleSnippetRetrieval]
  );

  return (
    <Fragment>
      <div className="main">
        <Header onRefresh={handleRefresh} loading={isRefreshing} />
        <List>
          {snippetList ? (
            snippetList.map(codeBlock => (
              <ListItem>
                <Accordion
                  header={
                    <GistItemForm
                      onAddSnippetClick={handleAddSnippet(codeBlock)}
                      onRemoveSnippetClick={handleRemoveSnippet(codeBlock)}
                      onFilenameChange={handleSnippetFilenameChange(codeBlock)}
                      filename={codeBlock.filename}
                    />
                  }
                >
                  <Gist code={codeBlock.code} url={codeBlock.url} />
                </Accordion>
              </ListItem>
            ))
          ) : (
            <ListItem className="snippet-status__list-item">
              <Heading element="p" className="h4">
                {snippetListStatus}
              </Heading>
            </ListItem>
          )}
        </List>
        {snippetList ? (
          <Footer
            snippetCount={selectedSnippets.length}
            onCreateGist={handleCreateGistClick(
              selectedSnippets,
              gistDescription
            )}
            onGistDescriptionChange={handleGistDescriptionChange}
            loading={isCreatingGist}
          />
        ) : null}
      </div>
      {showOverlay ? (
        <Overlay>
          <Dialog title="Gist Created." onDismiss={() => setShowOverlay(false)}>
            <CopyToClipboard value={lastGistUrl} />
          </Dialog>
        </Overlay>
      ) : null}
    </Fragment>
  );
};

export default Main;
