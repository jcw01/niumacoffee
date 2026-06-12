export function generateShareUrl(baseUrl: string, shareCode: string): string {
  return `${baseUrl}?share=${shareCode}`;
}

export function parseShareParam(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('share') || null;
}

export function generateShareText(levelEmoji: string, levelTitle: string, percentage: number, shareText?: string) {
  return {
    title: shareText || `我是${levelEmoji}${levelTitle}，你呢？测测你的牛马等级`,
    desc: `我的牛马等级：${levelTitle}（${percentage}%）`,
  };
}

/** 复制到剪贴板 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

/** 分享（优先 Web Share API，降级到复制链接） */
export async function shareToWeb(data: { title: string; text: string; url: string }): Promise<'shared' | 'copied' | 'cancelled' | 'unsupported'> {
  if (navigator.share) {
    try {
      await navigator.share({ title: data.title, text: data.text, url: data.url });
      return 'shared';
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        return 'cancelled';
      }
    }
  }

  const shareText = `${data.title}\n${data.text}\n${data.url}`;
  const ok = await copyToClipboard(shareText);
  return ok ? 'copied' : 'unsupported';
}
